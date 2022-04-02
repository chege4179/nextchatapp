import { UserActions } from "./UserConstants";

const ThemeReducer = (state = {theme:'light'},action) => {
     switch (action.type){
          case UserActions.SET_LIGHT_THEME:
               return {
                    theme:'light',
               }

          case UserActions.SET_DARK_THEME:
               return {
                    theme:'dark'
               }
          default:
               return state
     }

}
export const SelectTheme = state => state.theme.theme
export default ThemeReducer;
