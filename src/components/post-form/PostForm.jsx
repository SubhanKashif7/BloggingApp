import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE, LogoutBtn } from '../index';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.title || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  });

  const userData = useSelector(state => state.user.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      const databasePost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined
      });

      if (databasePost) {
        navigate(`/post/${databasePost.$id}`);
      }
    }
  };

  return (
    <div>
      {/* Your form elements go here */}
      {/* Example:
      <form onSubmit={handleSubmit(submit)}>
        <Input name="title" ref={register} />
        <Input name="slug" ref={register} />
        <Input name="content" ref={register} />
        <input type="file" name="image" ref={register} />
        <Button type="submit">Submit</Button>
      </form>
      */}
    </div>
  );
};

export default PostForm;
