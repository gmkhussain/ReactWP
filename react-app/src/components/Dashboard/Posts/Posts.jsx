import React, { useState, useEffect, useContext, useCallback } from 'react';
import DashboardLayout from "../../layout/DashboardLayout";

import post from '../../../services/post'
import AppContext from '../../context/AppContext';

import { Link } from 'react-router-dom'

const DashboardPosts = () => {

	const [postData, setPostData] = useState({
			loading: true,
			posts: [{"a":1}]
		  });

	const [ store, setStore ] = useContext( AppContext );
	console.log("Store: ", store)

  


	const getAllPosts1 = useCallback(async () => {
		// alert(1)
		console.log( "getAllPosts()..." )
		let res = await post.list();
		console.log("Dashboard Post: ", res.data)

		if ( res.status === 200 ) {
		  console.log("getAllPost Loaded")
		  setPostData({ loading: false, posts: res.data })
		  console.log( postData )
		}

	}, [setPostData] )




	
	useEffect( ()=> { 
		console.log("ONE TIME")
	}, [ ] );


	

	useEffect( ()=> {
	  getAllPosts1()
	}, [getAllPosts1] );
	


	const { posts, loading } = postData;


	return (
		<DashboardLayout>

			{
			  loading === true
			  ? " Loading... "
			  : 
			  	<div className="container ">

					<div className="row">
						<div className="col filters filters_1" >
							
							<button className="btn">
								<span>All</span>
							</button>

							<button className="btn">
								<span>Mine</span>
							</button>

							<button className="btn">
								<span>Published</span>
							</button>

							<button className="btn">
								<span>Drafts</span>
							</button>

							<button className="btn">
								<span>Trash</span>
							</button>

						</div>

						<div className="col filters filters_2 " >
							<form>
								<div className="col">
									<select className="col">
										<option value="">Bulk Action</option>
										<option value="edit">Edit</option>
										<option value="trash">Move to Trash</option>
									</select>
									<button className="btn">Apply</button>
								</div>

								<div className="col">
									<select className="col">
										<option value="">All Dates</option>
										<option value="2021">2021</option>
										<option value="2020">2020</option>
									</select>
									<select className="col">
										<option value="Uncategorized">Uncategorized</option>
										<option value="All Categories">All Categories</option>
									</select>
									<button className="btn">Filter</button>
								</div>
							</form>
						</div>
						
						<div className="col">
							<input type="text" className="col" />
							<button className="btn">Search</button>
						</div>
					</div>

					<table className="table" >
						<thead>
							<tr>
								<th>
									<input type="checkbox" className="text" />
								</th>
								<th>Title</th>
								<th>Author</th>
								<th>Categories</th>
								<th>Tags</th>
								<th>Comments</th>
								<th>Date</th>
							</tr>	
						</thead>
					   	<tbody className="tbody" >
							{ 
							posts.map( p=>(
								
								<tr className="tr" key={p.id}>
									<td className="td">
										<input type="checkbox" className="text" />
									</td>
									<td className="td">
										<small>{p.id}</small>
										<span>{p.title.rendered}</span>
										
										<div className="actions">
											<Link to={`/dashboard/post/edit/${301}`}>Edit</Link>
										</div>
									</td>
									<td className="td">
										{p.author}
									</td>
									<td className="td">
										{/* {p.categories} */}
										{
											p.categories.map( q=> "( "+ q + " )" )
										}
									</td>
									<td className="td">
										{ p.tags!=0 ? p.tags : "N/A" }
									</td>
									
									<td className="td">
										{ p.comment_status }
									</td>

									<td className="td">
										<span>{p.status}</span> <br />
										<span>{p.date}</span>
									</td>
								</tr>
							))
							}
					</tbody>
				</table>
			  </div>

			} 
			
		</DashboardLayout>
	)
};

export default DashboardPosts;