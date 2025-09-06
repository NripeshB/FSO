

const Header = (props)=>{
  // console.log(props.heading);
  return(
  <h1>
    {props.heading.name}
  </h1>
  )
}
const Parts = (props)=>{
  return(
      <p>
        {props.p} {props.e}
      </p> 
  )
}

const Content = ({p})=>{
return(
  <>
    {p.parts.map(part => (
      <Parts key={part.id} p={part.name} e={part.exercises} />
    ))}
    {/*<Parts p={props.p.parts[0].name} e={props.p.parts[0].exercises} />
<Parts p={props.p.parts[1].name} e={props.p.parts[1].exercises} />
<Parts p={props.p.parts[2].name} e={props.p.parts[2].exercises} />
*/ }
  </>
)
}
const Total = ({e})=>{

  const total = e.parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <b>Number of exercises {total}</b>
    //  <b>Number of exercises { props.e.parts[0].exercises +props.e.parts[1].exercises+props.e.parts[2].exercises}</b>
  )

}
const Course = (props)=>{
  return(<>
  <Header  heading= {props.course}/>
   <Content p = {props.course}  />
   <Total  e = {props.course} />
  </>
  )
}

const App = () => {
   const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
    ]
  }

  return (
    <div>
      <Course course={course} />
     {/* <Header  heading= {course}/>
     <Content p = {course}  />
     <Total  e = {course} /> */}
    </div>
  )
}

export default App

