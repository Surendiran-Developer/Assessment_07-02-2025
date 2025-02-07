import React , { useEffect , useState , useRef } from 'react'

const MainPage = () => {
    const [render , setRender] = useState(false);
    const modalRef = useRef(null);
  

    const READDASHBOARD_URL = `${process.env.REACT_APP_BASE_URL}/fileRead`;
    const [dashboardData , setDashboardData] = useState([]);

    const ADDDASHBOARD_URL = `${process.env.REACT_APP_BASE_URL}/fileUpload`;
    const [inputAddData , setinputAddData] = useState({});
    const fileAddRef = useRef(null);
    
    const UPDATEDASHBOARD_URL = `${process.env.REACT_APP_BASE_URL}/fileUpdate`;
    const [inputUpdateData , setinputUpdateData] = useState({FirstName:'', LastName:'', Role:'', DOB:'', Gender:'', Email:'', Mobile:'', City:'', State:''});
    const fileUpdateRef = useRef(null);
    

    const DELETEDASHBOARD_URL = `${process.env.REACT_APP_BASE_URL}/fileDelete`;

    useEffect(()=>{
        const getDashboardData = async () => {
          const response = await fetch(READDASHBOARD_URL , {
            method : 'GET',
            credentials : 'include'
          });
          const responded = await response.json();
          if(responded.Result === true){
            setDashboardData(responded.data);
          }
        }
        getDashboardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      } , [render]);

    const handleAddChange = (e) => {
        const { name , value , type , files , checked } = e.target;
        if(type === 'file'){
          setinputAddData({ ...inputAddData , [name] : files[0] });
        }else if(type === 'checkbox'){
          setinputAddData({ ...inputAddData , [name] : checked });
        }else{
          setinputAddData({ ...inputAddData , [name] : value });
        }
      }
      const handleAdd = async (e) => {
        e.preventDefault();
    
        const addFormData = new FormData();
        for(let key in inputAddData){
          addFormData.append(key , inputAddData[key]);
        }
        const response = await fetch( ADDDASHBOARD_URL , {
            method: 'POST',
            body: addFormData,
            credentials: 'include',
        });
        const responded = await response.json();
        if(responded.Result === true){
          setRender(!render);
          setinputAddData({mainContent : '' , subContent : '' , });
          
          
        }else{
          
        }
       
      }
    const handleExport = async(e) => {
        const response = await fetch( `${process.env.REACT_APP_BASE_URL}/export` , {
            method: 'POST',
            credentials: 'include',
        });
        const responded = await response.json();
        if(responded.Result === true){         
          
        }else{
          
        }
    }
    

      const handleModalData = (index) => {
        modalRef.current.blur();
        setinputUpdateData({_id : dashboardData[index]._id , FirstName : dashboardData[index].FirstName , LastName : dashboardData[index].LastName , Role : dashboardData[index].Role , DOB : dashboardData[index].DOB , Gender : dashboardData[index].Gender, Email : dashboardData[index].Email, Mobile : dashboardData[index].Mobile, City : dashboardData[index].City, State : dashboardData[index].State});
      }
      const handleReset = ()=>{
        modalRef.current.blur();
        setinputUpdateData({_id : '' , FirstName:'', LastName:'', Role:'', DOB:'', Gender:'', Email:'', Mobile:'', City:'', State:''});
      }
    
      const handleUpdateChange = (e) => {
        const { name , value , type , checked , files } = e.target;
        if(type === 'file'){
          setinputUpdateData({ ...inputUpdateData , [name] : files[0] });
        }else if(type === 'checkbox'){
          setinputUpdateData({ ...inputUpdateData , [name] : checked });
        }else{
          setinputUpdateData({ ...inputUpdateData , [name] : value });
        }
      }
      const handleUpdate = async (e) => {
        e.preventDefault();
    
        const updateFormData = new FormData();
        for(let key in inputUpdateData){
          updateFormData.append(key , inputUpdateData[key]);
        }
    
        const response = await fetch( `${UPDATEDASHBOARD_URL}/${inputUpdateData._id}` , {
            method: 'POST',
            body: updateFormData,
            credentials: 'include',
        });
        const responded = await response.json();
    
        if(responded.Result === true){
          setRender(!render);
          
        }else{
          
        }
      }
    
    
    
    
      const handleDelete = async (Id) => {
        const response = await fetch( `${DELETEDASHBOARD_URL}/${Id}` , {
            method: 'DELETE',
            credentials: 'include',
        });
        const responded = await response.json();
        if(responded.Result === true){
          setRender(!render);
          
          
        }else{
          
        }
      }
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="mt-3">
            <label className="form-label text-dark" htmlFor="excel">Excel</label>
            <input type="file" className="form-control" id="excel" name="excel" ref={fileAddRef} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <button type="button" className="btn btn-primary" onClick={ (e) => handleAdd(e)}>Save Dashboard Info</button>
            <button type="button" className="btn btn-primary" onClick={ (e) => handleExport(e)}>Export Excel</button>
          </div>
        </div>
      </div>
      <table className="table table-bordered mb-5">
            <thead>
                <tr className='text-center'>
                <th>S.No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
                <th>State</th>
                <th>Update</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                dashboardData && dashboardData.length > 0 ?

                dashboardData.map((item , index) => {
                    return (
                        <tr key={item._id}>
                        <td className='text-center'>{index + 1}</td>
                        <td>{item.FirstName}</td>
                        <td>{item.LastName}</td>
                        <td>{item.Role}</td>
                        <td>{item.DOB}</td>
                        <td>{item.Gender}</td>
                        <td>{item.Email}</td>
                        <td>{item.Mobile}</td>
                        <td>{item.City}</td>
                        <td>{item.State}</td>
        
                        <td className='text-center'><button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => handleModalData(index)}>Edit</button></td>
                        <td className='text-center'><button type="button" className="btn btn-danger" onClick={ () => handleDelete(item._id)}>Delete</button></td>
                        </tr>
                    );
                })
                

                :

                <tr>
                    <td colSpan={6} className='text-center'>No Data Available</td>
                </tr>

                }
            </tbody>
        </table>
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{inputUpdateData._id}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef} onClick={() => {handleReset()}}></button>
                </div>
                <div className="modal-body">
                    <div className="mt-3">
                        <label htmlFor="updateFirstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="updateFirstName" name="FirstName" value={inputUpdateData.FirstName} onChange={(e) => {handleUpdateChange(e)}}/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="updateLastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="updateLastName" name="LastName" value={inputUpdateData.LastName} onChange={(e) => {handleUpdateChange(e)}}/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="updateRole" className="form-label">Role</label>
                        <input type="text" className="form-control" id="updateRole" name="Role" value={inputUpdateData.Role} onChange={(e) => {handleUpdateChange(e)}}/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="updateDOB" className="form-label">DOB</label>
                        <input type="text" className="form-control" id="updateDOB" name="DOB" value={inputUpdateData.DOB} onChange={(e) => {handleUpdateChange(e)}}/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="updateGender" className="form-label">Gender</label>
                        <input type="text" className="form-control" id="updateGender" name="Gender" value={inputUpdateData.Gender} onChange={(e) => {handleUpdateChange(e)}}/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="updateEmail" className="form-label">Email</label>
                        <input type="text" className="form-control" id="updateEmail" name="Email" value={inputUpdateData.Email} onChange={(e) => {handleUpdateChange(e)}}/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="updateMobile" className="form-label">Mobile No</label>
                        <input type="text" className="form-control" id="updateMobile" name="Mobile" value={inputUpdateData.Mobile} onChange={(e) => {handleUpdateChange(e)}}/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="updateCity" className="form-label">City</label>
                        <input type="text" className="form-control" id="updateCity" name="City" value={inputUpdateData.City} onChange={(e) => {handleUpdateChange(e)}}/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="updateState" className="form-label">State</label>
                        <input type="text" className="form-control" id="updateState" name="State" value={inputUpdateData.State} onChange={(e) => {handleUpdateChange(e)}}/>
                    </div>
                    
                </div>
                <div className="modal-footer">
                    <div className="mt-3">
                    <button type="button" className="btn btn-primary" onClick={(e) => {handleUpdate(e)}}>Update Dashboard Info</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MainPage
