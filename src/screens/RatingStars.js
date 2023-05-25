import React from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-rating-stars-component';

const RatingStars = ({ value, onChange }) => {
  return (
    <StarRatings
      count={5}
      value={value}
      onChange={onChange}
      size={24}
      emptyIcon={<i className="far fa-star" />}
      fullIcon={<i className="fas fa-star" />}
      activeColor="#ffd700"
    />
  );
};

RatingStars.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RatingStars;
