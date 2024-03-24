import Tutor from "../Models/tutorModel.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandle.js";
import ApiFeatures from "../utils/apiFeatures.js";
import User from "../Models/userModel.js";

// tutor
export const addCourse = catchAsyncError(async (req, res, next) => {
  const { title, fee, category, image, video } = req.body;
  const name = req.user._id;

  const crs = await Tutor.create({ name, tutor: req.user.name, title, fee, category, image, video });

  crs.save();

  res.status(201).json({
    success: true,
    message: crs,
  });
});

// get course details
export const getCourseDetails = catchAsyncError (async (req, res, next) => {
  const detail = await Tutor.findById(req.params.id)

  if(!detail) return next(new ErrorHandler("No details with this id is found", 404))

  res.status(200).json({
    success: true,
    message: detail
  })
})

// tutor
export const editCourse = catchAsyncError(async (req, res, next) => {
  let course = await Tutor.findById(req.params.id);
  // console.log(course)
  const id1 = course.name
  const id2  = (req.user._id)
  if (!course) return next(new ErrorHandler("course not found", 400));

  if(!id1.equals(id2)) next(new ErrorHandler("You cannot edit others course", 400))
  course = await Tutor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    course,
  });
});

// anyone
export const getAllCourse = catchAsyncError(async (req, res, next) => {
  const resultperpage = 6;
  const courseCount = await Tutor.countDocuments();

  const apiFeature = new ApiFeatures(Tutor.find(), req.query).search().filter();

  
  
  apiFeature.pagination(resultperpage);
  
  let tutorials = await apiFeature.query;
  let filteredTutorialsCount = tutorials.length

  res.status(200).json({
    success: true,
    tutorials,
    resultperpage,
    courseCount,
    filteredTutorialsCount,
  });
});

// tutor
export const getMyCourses = catchAsyncError(async (req, res, next) => {
  const crs = await Tutor.find({ name: req.user._id });

  if (!crs) next(new ErrorHandler("You have no course", 400));

  res.status(200).json({
    success: true,
    message: crs,
  });
});

// tutor
export const deleteMyCourses = catchAsyncError(async (req, res, next) => {
  const crs = await Tutor.findById(req.params.id);
  const id1  = (crs.name);
  const id2  = (req.user._id)

  if (!crs) next(new ErrorHandler("You have no course", 404));
  if(!id1.equals(id2)) next(new ErrorHandler("You cannot delete others course", 400))

  await Tutor.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "course deleted successfully",
  });
});

// anyone
export const rateTutorials = catchAsyncError(async (req, res, next) => {
  const { rating, comment} = req.body;
  const { name } = await User.findById(req.user._id);
  const user = req.user._id;
  const image = req.user.avatar.url

  const review = {
    rating: Number(rating),
    name,
    comment,
    user,
    image
  };

  const crs = await Tutor.findById(req.params.id);

  if (!crs) return next(new ErrorHandler("no course found", 400));

  // console.log(crs);

  let isReviewed = false;
  isReviewed = crs.reviews.find(
    (rev) => rev.user.toString() === user.toString()
  );

  if (isReviewed) {
    crs.reviews.forEach((rev) => {
      if (rev.user.toString() === user.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    crs.reviews.push(review);
    crs.numOfReviews = crs.reviews.length;
  }

  let avg = 0;

  crs.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  crs.ratings = avg / crs.reviews.length;

  await crs.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a course
export const getCourseReviews = catchAsyncError(async (req, res, next) => {
  const course = await Tutor.findById(req.query.id);

  if (!course) {
    return next(new ErrorHandler("course not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: course.reviews,
  });
});

// Delete Review
export const deleteReview = catchAsyncError(async (req, res, next) => {
  const course = await Tutor.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  let rev = course.reviews.find(rev => rev._id.toString() === req.query.id.toString());

  if (rev && rev.user.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You cannot delete others' reviews", 400));
  }

  const reviews = course.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;
  const newState = {
    reviews,
    ratings,
    numOfReviews,
  };

  await Tutor.findByIdAndUpdate(req.params.id, newState, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

