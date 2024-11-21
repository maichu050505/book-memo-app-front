import { createContext, useState } from "react";

export const ReviewContext = createContext({});

export const ReviewProvider = ({children}) => {

    //編集モード切り替え
    const [isEditingReview, setIsEditingReview] = useState(true);

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [date, setDate] = useState(null);

    return (
      <ReviewContext.Provider
        value={{
          isEditingReview,
          setIsEditingReview,
          review,
          setReview,
          rating,
          setRating,
          date,
          setDate,
        }}
      >
        {children}
      </ReviewContext.Provider>
    );
};