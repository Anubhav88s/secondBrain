export const random = (len : number) => {
    let option = "poiuytrewqlkjhgfdsamnbvcxz"
    let length = option.length;
    let ans =" ";
    //to get a number between o => length of above string
    for (let i = 0 ; i < len; i++){
        ans += option[Math.floor((Math.random()*length))]
    }

    return ans;
}