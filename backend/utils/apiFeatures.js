class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword 
        ? {
            name:{
                $regex: this.queryStr.keyword,//regex is the mongodb operator, regular expression
                $options: "i"//i is for case insensitive, now it will give result for both small and capital letters
            }
        }:{};
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        /*if we use directly this.queryStr then we didn't get the value of it ,we get the refrence ,
        as this.queryStr is a object and in javascript object passes through refrence so their will be change in this.queryStr
        that's why we use the ... to pass the value not the refrence
        */
       const queryCopy = {...this.queryStr}

        //Removing some fields for category
        const removeFields = ["keyword","page","limit"];
        
        /*if we have keyword,page and limit in queryStr than we remove them so that we can filter the category*/
        removeFields.forEach(key=> delete queryCopy[key])/watch


        //Filter for Price
        let queryStr = JSON.stringify(queryCopy);//as queryCopy is a object and we have to remove some strings from queryCopy so, we have to change it into string
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$$(key)`);






        this.query = this.query.find(queryCopy);
        return this;
        }

}

module.exports = ApiFeatures