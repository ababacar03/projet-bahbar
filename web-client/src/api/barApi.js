import axios from 'axios';

const createAuthAPI = (token) => {
    if (!token) {
        throw new Error('Token requis pour accéder à l’API Bars');
    }

    return axios.create({
        baseURL: 'http://localhost:5001/api/bars',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const createBar = async (
    name,
    latitude,
    longitude,
    rate,
    description,
    image,
    address,
    phone,
    website,
    openingHours,
    manager,
    token
) => {
    if (!token) {
        throw new Error('Token requis pour créer un bar');
    }

    const payload = {
        name,
        latitude,
        longitude,
        rate,
        description,
        image,
        address,
        phone,
        website,
        openingHours,
        manager,
    };

    const api = createAuthAPI(token);
    const { data } = await api.post('/', payload);
    return data;
};


export const getAllBars = async () => {
    const { data } = await axios.get('http://localhost:5001/api/bars');
    return Array.isArray(data) ? data : data.bars || [];
};


export const getBarById = async (id, token) => {
    const api = createAuthAPI(token);
    const { data } = await api.get(`/${id}`);
    return data;
};

export const updateBar = async (
    id,
    name,
    latitude,
    longitude,
    rate,
    description,
    image,
    address,
    phone,
    website,
    openingHours,
    manager,
    token
) => {
    if (!token) {
        throw new Error('Token requis pour mettre à jour un bar');
    }

    const payload = {
        name,
        latitude,
        longitude,
        rate,
        description,
        image,
        address,
        phone,
        website,
        openingHours,
        manager,
    };

    const api = createAuthAPI(token);
    const { data } = await api.put(`/${id}`, payload);
    return data;
};


export const deleteBar = async (id, token) => {
    const api = createAuthAPI(token);
    const { data } = await api.delete(`/${id}`);
    return data;
};
