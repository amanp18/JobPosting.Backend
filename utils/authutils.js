import bcrypt from 'bcrypt'

export const Hashedpassword  = async(password)=>{
try {
    const saltround =10;
    const hashedpassword = await bcrypt.hash(password,saltround)
    return hashedpassword;
    
} catch (error) {
    console.log(error)
}
}
export const comparepassword  = async(password,hashedpassword)=>{
    const kt=  await bcrypt.compare(password,hashedpassword)
    return kt;
}