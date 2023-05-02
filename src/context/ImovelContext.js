import React, { createContext, useReducer } from 'react';
import imoveis from '../data/Imovel';

const initialState = {
    imoveis: imoveis
}

const ImovelContext = createContext({});

export const ImovelProvider = (props) => {

    function reducer(state, action){
        if(action.type === 'remover'){
            const newImoveis = state.imoveis.filter(imovel =>
                imovel.endereco != action.value.endereco)
                return{
                    ...state,
                    imoveis: newImoveis
                }
                }else if(action.type === 'salvar'){
                    state.imoveis.push(action.value)
                    return{
                        ...state
                    }
            }else if(action.type === 'editar'){
                const newImoveis = state.imoveis.map((i) =>
                i.endereco === action.value.endereco ? action.value : i)
                return{
                    ...state,
                    imoveis : newImoveis
                }
            }
            return state
        }
        const [state, dispatch] = useReducer(reducer, initialState);

            return(
                <ImovelContext.Provider value={{state, dispatch}}>
                    {props.children}
                </ImovelContext.Provider>
            )
    }
    
export default ImovelContext;