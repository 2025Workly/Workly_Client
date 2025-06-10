import CategoryBox from "./category-box"

type CategoryProps  = {
    tag : string,
    title : string,
    userId : string,
}

export default function BorderBox({ tag, title, userId } : CategoryProps ) {
    return (
        <div>
            <CategoryBox tag={tag}/>
            <div>{title}</div>
            <div>{userId}</div>
        </div>
    );
}