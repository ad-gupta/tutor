import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { myCourseFail, myCourseRequest, myCourseSuccess } from '../reducers/myCourses'
import axios from 'axios';
import CourseCard from '../components/CourseCard';

const getMyCourses = async (dispatch) => {
  try {
    dispatch(myCourseRequest());

    const { data } = await axios.get(`/api/v1/getMyCourse`);

    dispatch(myCourseSuccess(data));
    return data.message;
  } catch (error) {
    dispatch(myCourseFail(error));
    return null; 
  }
}

const MyCourses = () => {
  const [course, setCourse] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyCourses(dispatch);
      if (data) {
        setCourse(data);
      }
    };
    fetchData();
  }, [dispatch]);

  console.log(course);

  return (
    <div className="pt-20 mx-20 max-lg:mx-0 min-h-screen">
      {
        course && course.map((crs) => (
          <div className="" key={crs._id}>
            <CourseCard course = {crs} />
          </div>
        ))
      }
    </div>
  )
}

export default MyCourses;
