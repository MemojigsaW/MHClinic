import React, {useEffect, useState} from "react";

function PaginateReviews(pg, limit, cid) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        const path = '/api/review/' + cid + '&' + pg + '&' + limit;

        setLoading(true);
        setError(false);

        fetch(path, {method: 'GET'})
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    console.log("fetch Review failed");
                    setError(true);
                }
            })
            .then(data => {
                setHasMore((data.reviews.length+reviews.length)<data.total);
                setReviews(prevReviews=>{
                    return [...prevReviews, ...data.reviews];
                });
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
                setError(true);
            })
    }, [pg]);

    return {loading, error, reviews, hasMore}
}



export default PaginateReviews;