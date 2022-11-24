import React from 'react';

const Blog = () => {
    return (
        <select className="select select-accent w-full max-w-xs">
            <option disabled selected>Dark mode or light mode?</option>
            <option>Auto</option>
        </select>
    );
};

export default Blog;