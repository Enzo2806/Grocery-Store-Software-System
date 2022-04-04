// Importing axios and setting up URLs
import axios from 'axios'
const config = require('../../../../config');
const backendUrl = (process.env.NODE_ENV === "production")
  ? `https://${config.build.backendHost}`
  : `http://${config.dev.backendHost}:${config.dev.backendPort}`;
const frontendUrl = (process.env.NODE_ENV === "production")
  ? `https://${config.build.host}`
  : `http://${config.dev.host}:${config.dev.port}`;
const AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
});
  
export default {
    name: 'employeeviewshifts',

    data(){
        return{
            shifts: [],
            error: '',
            response: []
        }
    },

    // Retrieve all shifts from an employee email
    created: function(){
        localStorage.setItem("email", "email@employee.com")
        // Initilizing shifts from backend
        AXIOS.get('/shiftsbyemployee/' + localStorage.email)
        .then(response => {
            // JSON repsonses are automatically parsed.
            this.shifts = response.data
        })
        .catch(e => {
            this.error = e.response.data
            setTimeout(()=>this.error=null, 3000)
        })

        if(this.shifts.length == 0) {
          this.error = "Note: The current employee has not yet been assigned any shifts"
          setTimeout(()=>this.error=null, 3000)
        }
    }
}