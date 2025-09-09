import React from 'react';

const Avatar = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-8 h-8 rounded-full ring-2 ring-gray-200"
    style={{ objectFit: 'cover' }}
  />
);

export default Avatar;
