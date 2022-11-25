import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Flip } from "react-toastify";

import { Provider } from "react-redux";
import { Store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        limit={2}
      />
    </Provider>
  </React.StrictMode>
);

/*                                                                                          
                                                     .                                     
                                                    @O                                    
                                                     @@                                   
                                                     °@@                                  
                                                      #@o                                 
                                                      #@#                                 
                                                     o@@°                                 
                                                    @@@°                                  
                                             .°oO@@@@o      °o#@@@@@@#o.                  
                                       °O@@@@@@@@#*      o@@@@@@@@@@@@@@@@*               
                                    .@@@@@@O*.         #@@@@@@@@@@@@@@@@@@@@.             
                                    @@@@*             @@@@@@@#°     *@@@@@@@@.            
                                  .@@@@.             @@@@@@@          @@@@@@@@            
                                   @@@@             #@@@@@@           @@@@@@@@            
                                   @@@@@O.       .o@@@@@@@           O@@@@@@@@            
                        ....        O@@@@@@@@@@@@@@@@@@@°           @@@@@@@@@             
                .o@@@@@@@@@@@@@@@#o.  °O@@@@@@@@@@@@@o.          °@@@@@@@@@@.             
              @@@@@@@@@@@@@@@@@@@@@@@@O°    .....            .o@@@@@@@@@@@O               
           O@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Oo°°....°°**o#@@@@@@@@@@@@@@#                 
         °@@@@@@@@@@@@@@@##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@°                   
        °@@@@@@@@@@@O.         .o@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@O°                      
        @@@@@@@@@@@                 .*O@@@@@@@@@@@@@@@@@@@@@#o°.                          
!      @@@@@@@@@@°        RFD                °*O#@@@@@@@@@@O*.                           
!      #@@@@@@@@@@     DEVELOPMENT       °o#@@@@@@@@@@@@@@@@@@@@#.                       
        .@@@@@@@@@@@O.              .*O@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.                     
         .@@@@@@@@@@@@@@Oo**°°*oO#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@°                    
           O@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@O*°      *@@@@@@@@@@                    
              @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@O*.             °@@@@@@@@@                    
                °O@@@@@@@@@@@@@@@@@@@@@O°                 °#@@@@@@@@@@                    
                      .°***oooo**°.                .°o#@@@@@@@@@@@@@#                     
                                                #@@@@@@@@@@@@@@@@@@°                      
                                            °@@@@@@@@@@@@@@@@@@@o                         
                                           @@@@@@@@@@@@@@Oo*.                             
                                          @@@@@@@@@@*                                     
                                         @@@@@@@@@                                        
                                        .@@@@@@@@                                         
                                        °@@@@@@@@                                         
                                         @@@@@@@@                                         
                                        @@@@@@@@@#                                        
                                       °@@@@@@@@@@.                                       
                                        @@@@@@@@@@o                                       
                                        @@@@@@@@@@                                        
                                         @@@@@@@@.                                        
                                          @@@@@@o                                         
                                            #@O.                                          
                                             #                                            
                                             °                                            
                                             .                                            
                                                                                          
*/
