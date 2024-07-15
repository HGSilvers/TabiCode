import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import debug from "sabio-debug";
import "./blogadminsubmit.css";
import { toast } from "react-toastify";
import BlogAdminView from "./BlogAdminView";
import blogSubmitSchema from "../../schemas/blogSubmitSchema";
import BlogContentEditor from "./BlogContentEditor"; 

const _logger = debug.extend("BlogAdminSubmit");

const initialEditorData = "Add a description to your blog post!";

function BlogAdminSubmit() {
  const [submitted, setSubmitted] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [showBlogView, setShowBlogView] = useState(false);

  const initialValues = {
    image: "",
    title: "",
    subject: "",
    content: initialEditorData,
  };

  const handleBlogSubmit = (values) => {
    const publishDate = new Date().toLocaleDateString();
    const publishTime = new Date().toLocaleTimeString();
    const newBlogData = {
      ...values,
      authorName: "Virginia Woolf",
      publishDate: publishDate,
      publishTime: publishTime
    };

    _logger("Submitting blog post with values:", newBlogData);
    setBlogData(newBlogData);
    setSubmitted(true);
    toast.success("Blog post submitted successfully!");
  };

  return (
    <div className="blogadminsubmit-container">
      <h2 className="blogadminsubmit-heading">Submit Blog Post</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={blogSubmitSchema}
        onSubmit={handleBlogSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="blogadminsubmit-form-group">
              <label htmlFor="image">Image URL</label>
              <Field type="text" name="image" className="form-control" placeholder="Image URL" />
              <ErrorMessage name="image" component="div" className="blogadminsubmit-err-msg" />
            </div>
            <div className="blogadminsubmit-form-group">
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" className="form-control" placeholder="Title" />
              <ErrorMessage name="title" component="div" className="blogadminsubmit-err-msg" />
            </div>
            <div className="blogadminsubmit-form-group">
              <label htmlFor="subject">Subject</label>
              <Field type="text" name="subject" className="form-control" placeholder="Subject" />
              <ErrorMessage name="subject" component="div" className="blogadminsubmit-err-msg" />
            </div>
            <div className="blogadminsubmit-form-group">
              <label htmlFor="content">Content</label>
              <BlogContentEditor
                data={values.content}
                onChange={(data) => setFieldValue("content", data)}
              />
              <ErrorMessage name="content" component="div" className="blogadminsubmit-err-msg" />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Publish</button>
          </Form>
        )}
      </Formik>

      {submitted && !showBlogView && (
        <div className="blog-post-submitted">
          <h2>Blog Post Successfully Submitted!</h2>
          <button className="btn btn-primary" onClick={() => setShowBlogView(true)}>
            View Post
          </button>
        </div>
      )}

      {showBlogView && blogData && <BlogAdminView blogData={blogData} />}
    </div>
  );
}

export default BlogAdminSubmit;
