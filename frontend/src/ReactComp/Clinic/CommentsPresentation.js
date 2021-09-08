import React, {useState, useRef, useCallback} from "react";
import PaginateReviews from "./Pagination"

import Comment from "./Review";
import LoadingSpinner from "../Shared/LoadingScreen/LoadingSpinner";


const CommentsPresentation = ({clinic}) => {
    const [pg, setPg] = useState(0);
    const limit = 10;

    const {
        loading,
        error,
        reviews,
        hasMore
    } = PaginateReviews(pg, limit, clinic._id);

    const observer = useRef(null);
    const lastReviewElementRef = useCallback(node => {
        if (loading) {
            return
        }
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPg(prevState => prevState + 1);
            }
        })
        if (node) {
            observer.current.observe(node);
        }

    }, [loading, hasMore]);


    return (
        <div id={'CommentsWrapper'}>
            {reviews.map((element, index) => {
                if (index + 1 === reviews.length) {
                    return (
                        <>
                            <div ref={lastReviewElementRef}/>
                            <Comment element={element}/>
                        </>
                    )
                } else {
                    return (
                        <Comment element={element}/>
                    )
                }
            })}
            {loading ? <LoadingSpinner/> : null}
            {error ? <div>An Error from API call</div> : null}
        </div>
    )
}

export default CommentsPresentation