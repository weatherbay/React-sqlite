import React, {Component} from 'react'
//import axios from 'axios'
import {
    Button,
    
    Form,
    Label,
    Input
} from 'reactstrap'

import Datepicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Biolist =  props =>(
    <tr>
      
      <td className="bg-primary">{props.loadbio.firstname}</td>
      <td className="bg-warning">{props.loadbio.lastname}</td>
      <td className="bg-success">{props.loadbio.age}</td>
      
    </tr>
  )

class Biodata extends Component {
    state = {
        firstname:'',
        lastname:'',
        age:'',
        dob:new Date(),
        phoneno:'',
        email:'',
        matricno:'',
        result:[]
        
    }

    componentDidMount(){
        fetch('/biodata/getdata'

        ,{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
            .then(function(response){
            return response.json()})
            .then((resu)=>{
                console.log(resu.data)
                    this.setState({result:resu.data})
                
            })
        
    }
    
    onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    onChangedob = (dob)=>{
        this.setState({
          dob:dob
        })
      }

    loadata = ()=>{
        const data = this.state.result
        console.log(data)
        return data.map(userinfo =>{
            return<Biolist loadbio={userinfo}key={userinfo.id}/>
          })
    }

    onSubmit = (e) =>{
        e.preventDefault()
        if(!this.state.firstname || !this.state.lastname ||!this.state.phoneno
            ||!this.state.age ||!this.state.email ||!this.state.matricno){
            //this.setState({errors:'missing field'})
            return alert('missing field')
        }
        const {firstname,lastname,phoneno,age,dob,email,matricno} = this.state
        const newUser = {
            firstname,
            lastname,
            phoneno,
            age,
            dob,
            email,
            matricno


        }

        var request = new Request('/biodata/adddata',{
            method:'POST',
            headers:new Headers({'Content-Type':'application/json','Accept':'application/json'}),
            body:JSON.stringify(newUser)
            
        })

        

        //xmlhttp request
        fetch(request)
        .then(function(response){
            response.json()
            .then(function(newUser){   
            })
            
        })
        if(request){
            return alert('form submitted')
            
        }

        
    
    }

    
    render (){
        return (
            <div>
         <hr/>       
        
                      <Form onSubmit={this.onSubmit} className="form-inline my-2 my-lg-0">
                          <div className="form-inline">
                              <Label for="firstname">First Name</Label>
                              <Input
                              type="text"
                              name="firstname"
                              id="firstname"
                              value={this.state.firstname}
                              placeholder="First Name"
                              className="form-control mr-2 my-lg-0"
                              onChange={this.onChange}
                              />
                              <Label for="lastname">Last name</Label>
                              <Input
                              type="lastname"
                              name="lastname"
                              id="lastname"
                              value={this.state.lastname}
                              placeholder="Last Name"
                              className="form-control mr-2 my-lg-0"
                              onChange={this.onChange}
                              />
                              <Label for="phoneno">Phoneno</Label>
                              <Input
                              type="text"
                              name="phoneno"
                              id="phoneno"
                              value={this.state.phoneno}
                              placeholder="Phoneno"
                              className="form-control mr-2 my-lg-0"
                              onChange={this.onChange}
                              />
                              </div>
                              <br/>
                              <div className="form-inline">
                              <Label for="email">Email</Label>
                              <Input
                              type="text"
                              name="email"
                              id="email"
                              value={this.state.email}
                              placeholder="Email"
                              className="form-control mr-2 my-lg-0"
                              onChange={this.onChange}
                              />
                              <Label for="age">Age</Label>
                              <Input
                              type="text"
                              name="age"
                              id="age"
                              value={this.state.age}
                              placeholder="Age"
                              className="form-control mr-2 my-lg-0"
                              onChange={this.onChange}
                              />
                              <Label for="dob">DOB</Label>
                              <Datepicker
                                dateFormat='yyyy-dd-mm'
                                selected={this.state.dob}
                                onChange={this.onChangedob}
                            />
                            <br/>
                              <Label for="matricno">Matricno</Label>
                              <Input
                              type="text"
                              name="matricno"
                              id="matricno"
                              value={this.state.matricno}
                              placeholder="Matric no"
                              className="form-control mr-2 my-lg-0"
                              onChange={this.onChange}
                              />
                              </div>
                              <br/>
                              <Button
                              color="dark"
                            
                              className="btn btn-primary my-2"
                              
                              >Submit</Button>
                          
                      </Form>
                      <br/>
                      
                    <h5>Logged data</h5>
                    <table className="table">
          <thead className="thead-primary">
              
            <tr className="bg-info">
              
              <th>Firstname</th>
              <th>Middlename</th>
              <th>Age</th>
              
              
            </tr>

          </thead>
          
          <tbody>
            {this.loadata()}
          </tbody>

        </table>

                 

            </div>
        )
    }

}

export default Biodata