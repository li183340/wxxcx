const db = wx.cloud.database(); //拿到数据库的引用

 //条件查询
 async function get(_collection = "", _where = {}) {
 	var result = await db.collection(_collection).where(_where).get()
 	return result;
 }

 //根据id进行查询
 async function getById(_collection, id) {
 	return await db.collection(_collection).doc(id).get()
 }
 
 //添加数据
 async function add(_collection="",_data={}){
	return await db.collection(_collection).add({
		data:_data
	})
 }
 //修改数据
 async function edit(_collection="",id,_data){
	 return await db.collection(_collection).doc(id).update(
		 {
			 data:_data
		 }
	 )
 }

 async function del(_collection, id) {
	return await db.collection(_collection).doc(id).remove()
}

 export {
 	get,
 	getById,
	add,
	edit,
	del
 }
