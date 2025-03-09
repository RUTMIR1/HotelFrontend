import React, { createContext, ReactNode, useContext, useState } from "react"

const themeContext = createContext<{theme:string; setTheme:React.Dispatch<React.SetStateAction<string>>} | undefined>(undefined);

export const useThemeContext = ()=>{
    const context = useContext(themeContext);
    if(!context){
        throw new Error("themeContext must be used in to themeProvider");
    }
    return context;
}

interface IThemeProviderProps{
    children: ReactNode;
}

export function ThemeProvider({children}:IThemeProviderProps){
    const [theme, setTheme] = useState<string>('light-theme');

    return (
        <>
            <themeContext.Provider value={{theme, setTheme}}>
                {children}
            </themeContext.Provider>
        </>
    )
}