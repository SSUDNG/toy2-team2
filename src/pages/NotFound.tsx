import { useSelector } from 'react-redux';
import { RootState } from '../store';

function NotFound() {
  const department = useSelector((state: RootState) => state.login);
  // const { department, jobposition } = useSelector(
  //   (state: RootState) => state.login,
  // );
  console.log(department);
  // return (
  //   <div>
  //     {/* <h1>Profile</h1> */}
  //     {/* <p>Department: {department}</p> */}
  //     {/* <p>Job Position: {jobposition}</p> */}
  //   </div>
  // );
}

export default NotFound;
