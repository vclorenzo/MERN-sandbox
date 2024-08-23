import { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useUpdateProfileMutation } from '../../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { userInfo } = useSelector((state) => state.auth);
  console.log('🚀 ~ ChangePassword ~ userInfo:', userInfo);

  // useEffect(() => {
  //   setName(userInfo.name);
  //   setEmail(userInfo.email);
  // }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        return toast.error('Password mismatch');
      }
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <FormContainer>
      <h1>Change Password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Current Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader />}
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ChangePassword;
