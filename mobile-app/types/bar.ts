export interface Bar{
    _id: string,
    name?: string,
    nameBar?: string,
    image : string,
    latitude: number,
    longitude: number,
    address: string,
    rate: number,
    openingHours: string,
    tags?: string[],
    phone?: string,
    website?: string,
    description?: string,
    manager?: {
        username: string
    },
    createdAt?: string;
    __v?: number;
}