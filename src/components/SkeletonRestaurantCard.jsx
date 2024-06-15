import { Skeleton } from "@mantine/core";

export default function SkeletonRestaurantCard() {
    return (
        <div className="flex flex-col">
            <Skeleton height={240} width={240} className="mb-2 rounded-lg" />
            <Skeleton height={20} width={80} className="mb-2"/>
            <Skeleton height={20} width="100%" />
        </div>
    );
}
