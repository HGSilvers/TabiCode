import React from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import debug from 'sabio-debug';

const _logger = debug.extend('BlogContentEditor');

function BlogContentEditor({ data, onChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: ['bold', 'italic', 'link', 'undo', 'redo'],
      }}
      data={data}
      onChange={(event, editor) => {
        const content = editor.getData();
        _logger('Content changed:', content);
        onChange(content);
      }}
      onReady={editor => {
        _logger('Editor is ready to use!', editor);
      }}
    />
  );
}

BlogContentEditor.propTypes = {
  data: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BlogContentEditor;