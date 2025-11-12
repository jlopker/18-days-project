import React, { useState } from 'react';
import './SlidingScale.css';

function SlidingScale({ onPriceChange }) {
  const [price, setPrice] = useState(50);
  const minPrice = 0;
  const maxPrice = 200;

  const handleSliderChange = (e) => {
    const newPrice = parseInt(e.target.value);
    setPrice(newPrice);
    onPriceChange(newPrice);
  };

  const handleInputChange = (e) => {
    const newPrice = parseInt(e.target.value) || minPrice;
    const validPrice = Math.min(Math.max(newPrice, minPrice), maxPrice);
    setPrice(validPrice);
    onPriceChange(validPrice);
  };

  const getPriceLevel = () => {
    if (price < 18) return 'Minimum';
    if (price < 72) return 'Standard';
    return 'Pay For Someone Else';
  };

  return (
    <div className="sliding-scale">
      <div className="scale-header">
        <h3>Choose Your Price</h3>
        <p className="scale-description">
          We believe everyone should have access. Pay what feels right for your situation.
        </p>
      </div>

      <div className="scale-container">
        <div className="price-display">
          <div className="current-price">
            <span className="currency">$</span>
            <input
              type="number"
              value={price}
              onChange={handleInputChange}
              min={minPrice}
              max={maxPrice}
              className="price-input"
            />
          </div>
          <div className="price-level">{getPriceLevel()}</div>
        </div>

        <div className="slider-wrapper">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={handleSliderChange}
            className="price-slider"
          />
          <div className="slider-labels">
            <span className="label-min">${minPrice}</span>
            <span className="label-max">${maxPrice}</span>
          </div>
        </div>

        <div className="price-tiers">
          <div className={`tier ${price < 18 ? 'active' : ''}`}>
            <span className="tier-range">$0 - $18</span>
            <span className="tier-name">Minimum</span>
          </div>
          <div className={`tier ${price >= 18 && price < 72 ? 'active' : ''}`}>
            <span className="tier-range">$18 - $72</span>
            <span className="tier-name">Standard</span>
          </div>
          <div className={`tier ${price >= 72 ? 'active' : ''}`}>
            <span className="tier-range">$72 - $200</span>
            <span className="tier-name">Pay For Someone Else</span>
          </div>
        </div>

        <div className="tier-benefits">
          {price < 18 && (
            <div className="benefits-list">
              <h4>Minimum Access:</h4>
              <ul>
                <li>Access to core writing prompts</li>
                <li>Community forum access</li>
                <li>Basic resources</li>
              </ul>
            </div>
          )}
          {price >= 18 && price < 72 && (
            <div className="benefits-list">
              <h4>Standard Access includes:</h4>
              <ul>
                <li>Full access to all course materials</li>
                <li>Daily writing prompts (18 days)</li>
                <li>Community support access</li>
                <li>Accountability partner matching</li>
              </ul>
            </div>
          )}
          {price >= 72 && (
            <div className="benefits-list">
              <h4>Pay For Someone Else includes:</h4>
              <ul>
                <li>Everything in Standard, plus:</li>
                <li>Support another participant's access</li>
                <li>Premium group sessions</li>
                <li>Extended community access</li>
                <li>Lifetime access to resources</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SlidingScale;
