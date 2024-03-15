import catchAsyncError from "../middleware/catchAsyncError.js";
import User from "../Models/userModel.js";
import ErrorHandler from "../utils/errorHandle.js";
import sendCookie from "../utils/sendCookie.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'

export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password })
  const user = await User.create({ name, email, password });
  sendCookie(user, 201, res);
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  console.log({email, password})
  if (!email || !password) return next(new ErrorHandler("Invalid email or password", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid email or password", 401));

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) return next(new ErrorHandler("Invalid email or password", 401));

  sendCookie(user, 200, res);
});

export const myProfile = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: req.user
  })
})

export const updateProfile = catchAsyncError(async(req, res, next) => {
  let course = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: course
  })
})

export const logout = catchAsyncError( async(req, res, next) => {
    res.cookie("access_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "logged-out successfully"
    })
})

export const forgotPassword = catchAsyncError( async (req, res, next) => {
  const user = await User.findOne({email: req.body.email});
  if(!user) next(new ErrorHandler("User not found", 401));
  
  const resetToken = user.getResetPasswordToken();

  await user.save({validateBeforeSave: false})
  const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`
  try {
    const option = {
      email: user.email,
      subject: 'forgot password',
      message: message
    }
    await sendEmail(option)

    res.status(200).json({
      success: true,
      message: `Email has been sent to ${user.email} successfully.`
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({validateBeforeSave: false})
    return next(new ErrorHandler(error.message, 500))
  }
})

export const resetPassword = catchAsyncError( async(req, res, next) => {
  
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

  const user = await User.findOne({resetPasswordToken, resetPasswordExpire: { $gt: Date.now() },});

  if(!user) return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400))

  if(req.body.password !== req.body.confirmPassword) return next(new ErrorHandler("Password do not match", 400))

  user.password = req.body.password
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendCookie(user, 200, res);
  
})

export const updatePassword = catchAsyncError(async(req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = req.body.newPassword

  await user.save();

  sendCookie(user, 200, res)
})