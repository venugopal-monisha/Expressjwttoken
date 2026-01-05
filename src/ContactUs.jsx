import React, { useState } from "react";

export default function ContactUs() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState("");

  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedbackData = {
      name: user.name,
      email: user.email,
      feedbackText: feedback,
      submittedAt: new Date().toISOString(),
    };

    const prev = JSON.parse(localStorage.getItem("feedbacks")) || [];
    localStorage.setItem("feedbacks", JSON.stringify([...prev, feedbackData]));

    setFeedback("");
    setSuccess("Feedback submitted successfully!");
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit}>
        <input value={user.name} readOnly />
        <input value={user.email} readOnly />

        <textarea
          placeholder="Your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {success && <p className="success">{success}</p>}
    </div>
  );
}
