import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { HiMiniXMark } from 'react-icons/hi2';
import { FaPaperclip } from 'react-icons/fa';
import { IoSendSharp } from 'react-icons/io5';

const StandardMessageForm = ({ props, activeChat }) => {
  // console.log('🚀 ~ StandardMessageForm ~ activeChat:', activeChat);
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [preview, setPreview] = useState('');

  const handleChange = (e) => setMessage(e.target.value);
  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace('Z', `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChat: activeChat.id,
    };
    props.onSubmit(form);
    setMessage('');
    setAttachment('');
  };

  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            className="message-form-preview-image"
            src={preview}
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <HiMiniXMark
            className="message-form-icon-x"
            onClick={() => {
              setPreview('');
              setAttachment('');
            }}
          />
        </div>
      )}
      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Send a message..."
          />
        </div>
        <div className="message-form-icons">
          <Dropzone
            accept={{ 'image/jpeg': ['.jpg', '.jpeg', '.png'] }}
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => {
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <FaPaperclip
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>
          <hr className="vertical-line" />
          <IoSendSharp
            className="message-form-icon-airplane"
            onClick={() => {
              setPreview('');
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StandardMessageForm;
