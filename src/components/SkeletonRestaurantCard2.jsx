import { Skeleton } from '@mantine/core';

export default function SkeletonRestaurantCard2() {
    return (
        <div className="flex flex-col">
            <Skeleton height={144} width={220} className="mb-2 rounded-lg" />
            <Skeleton height={20} width={100} className="mb-1"/>
            <Skeleton height={20} width="100%" className="mb-1"/>
            <Skeleton height={20} width="100%" className="mb-1"/>
            <Skeleton height={20} width="70%" className="mb-1"/>
            <Skeleton height={20} width={100}/>
        </div>
    );
}