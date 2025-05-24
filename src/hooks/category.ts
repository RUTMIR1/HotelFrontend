import { useState, useEffect } from 'react';
import { Category } from '../model/Category';
import { getAllCategories } from '../services/categoryService';

const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const [errorCategories, setErrorCategories] = useState<string>();

    useEffect(() => {
        getAllCategories().then(
            response=>{
                setCategories(response);
            }
        ).catch(error=>{
            setErrorCategories(error.message);
        }).finally(()=>setLoadingCategories(false));
    }, []);

    return { categories, errorCategories, loadingCategories };
};

export default useCategories;