const express = require ('express'); 
const router = express.router();

const reviews= [
    {id:1,productld:1,rating:5,comment:"Excellent!"},
    {id:2,productld:2,rating:3,comment:"it is okay"}
];

router,get("/",(req,res) => {
    let result = reviews;

    if (req.query.rating){
        result = reviews.filter (review
            =>review.rating ===
            Number(req.query.rating));
        
    }

    res.status(200).json({
        success:true,
        data:result,
        meta:{timestamp: new
        Date().tolSOString(),count:
        result.lenght}
        });
    });


router.get("/:id",(req,res) => {
    const id = Number(req.params.id);
    
    const review = reviews.find (review
        =>review.id === id);
    )

    if (!review) {
        return res.status (404).json ({
            success:false,
            error: { code: "NOT_FOUND",
                message: "Review not found"}
            });
        }
    
    res.status(200).json ({
        success:true,
        data:[review],
        meta: { timestamp:new
            Date().tolSOString(), count: 1}
        });
    });

    router.post("/")