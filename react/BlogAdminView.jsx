import React from "react";
import PropTypes from "prop-types";
import "./blogadminview.css";

function BlogAdminView({ blogData }) {
  const { authorName, image, title, subject, content, publishDate, publishTime } = blogData;

  return (
    <div className="blog-post-container">
      <div className="blog-post-card">
        <div className="blog-post-card-header">
          <img src={image} alt={title} />
        </div>
        <div className="blog-post-card-body">
          <h4>{title}</h4>
          <p>Subject: {subject}</p>
          {content}
          <div className="blog-post-user">
            <div className="blog-post-user-info">
              <p>Author: {authorName}</p>
              <p>Publishing Date: {publishDate}</p>
              <p>Publishing Time: {publishTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BlogAdminView.propTypes = {
  blogData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    authorName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired,
    publishTime: PropTypes.string.isRequired
  }).isRequired
};

export default BlogAdminView;