import { MovieForm } from '../../Components/MovieForm'

export const MovieAddPage = () => {
  return (
    <div style={{width:"320px",minHeight:"250px" ,borderColor:"black", borderStyle:"solid",marginTop:"20px", marginBottom:
      "50px"}}>
        <h3>Add new Movie</h3>
        <MovieForm isEdit={false} data={false}/>
        
    </div>
  )
}
