// import React from 'react';



// export default class Modal extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       ...props
//     }
//   }

//   handleSubmit = e => {
//     e.preventDefault();
//     this.state.onRequestClose()
//     this.props.event.title ? this.state.onEditEvent(this.state.event) :
//       this.state.onCreatEvent(this.state.event)
//   }

//   handleDelete = e => {
//     e.preventDefault();
//     this.state.onRequestClose()
//     this.state.onDeleteEvent(this.state.event)
//   }
//   handleCancel = e => {
//     e.preventDefault();
//     this.state.onRequestClose()
//   }

//   render() {
//     return (
//       <form
//         onSubmit={e => this.handleSubmit(e)}
//       >
//         <button
//           className={this.props.event.title ? '' : 'd-none'}
//           label="Delete"
//           type="button"
//           secondary={true}
//           onClick={this.handleDelete}
//         >Button</button>
//         <div>
//           <textarea
//             defaultValue={this.state.event.title}
//             placeholder="Title"
//             onChange={(event, newValue) => this.setState({event: {...this.state.event, title: newValue}})}
//           />
//           <textarea
//             defaultValue={this.state.event.desc}
//             placeholder="Description"
//             onChange={(event, newValue) => this.setState({event: {...this.state.event, desc: newValue}})}
//           />
//           {'phone' in this.state.event ? <textarea
//             defaultValue={this.state.event.phone}
//             placeholder="Phone"
//             onChange={(event, newValue) => this.setState({event: {...this.state.event, phone: newValue}})}
//           /> : ''}

//         </div>
//         <div>
//           <button
//             className={this.props.event.title ? ' mr-3 my-3' : 'd-none mr-3 my-3'}
//             label="Update"
//             primary={true}
//             type="submit"
//             >Update</button>
//           <button
//             className={this.props.event.title ? 'bg-red-500' : 'bg-blue-500'}
//             label="Create"
//             primary={true}
//             type="submit"
//           >Create</button>
//           <button
//             className='bg-green-500'
//             label="Cancel"
//             type="Cancel"
//             onClick={this.handleCancel}
//           />

//         </div>

//       </form>
//     );
//   }
// }
