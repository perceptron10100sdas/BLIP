import { db } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
export default function Signin() {
  const router = useRouter();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser.providerData[0];
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          username: user.displayName.split(" ").join("").toLocaleLowerCase(),
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
        });
      }
      
      
      
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[url('/blip.jpg')] bg-cover
    bg-center  min-h-screen -z-20">
    <div className="flex justify-center  space-x-4 ">
      
      <div className="">
        <div className="flex flex-col items-center">
          <h1 className="text-7xl text-pink-500 font-thin italic overline mt-20 brightness-150 contrast-150 ">Blip</h1>
          <p className="text-center text-sm italic my-10">
            This app is created for learning purposes
          </p>
          <button
            onClick={onGoogleClick}
            className="bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg p-3 text-white hover:bg-red-500 mt-16 font-semibold italic"
          >
            Join with Google
          </button>
          <p className="mt-40 font-thin text-sky-500 text-2xl italic">perceptron10100sdas</p>
        </div>
      </div>

    </div>      </div>
  );
}