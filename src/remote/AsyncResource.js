import axios from "axios";

class Base {

  constructor(option){
    this.option = option;
  }

  some(links) {
    if (!(links instanceof Array)) {
      return {};
    }

    let axioses = links.map((item, index) => {
        return function(){
            // return axios.get(item.link);
            return axios({
                method:this.option.method || "GET",
                url:item.link,
                headers: this.option.method || {}
            })
        }
    });
    
    axios.all(axioses.map(
        function(item){
            return item();
        }
    )).then(
      axios.spread(function(...r) {
        console.log("ok",r);
        // Both requests are now complete
      })
    );

    return axioses;
  }
}

function AsyncResource(option){
  return new Base()
}

export default AsyncResource;