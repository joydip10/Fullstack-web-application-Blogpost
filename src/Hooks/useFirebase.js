import { useEffect, useState } from "react";
import { app, fireDb } from "../firebase.config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const useFirebase = () => {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    })
  }, [])

  const signUp = async (name, email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateName(name);
      const user = userCredential.user;

      const userObj = {
        id: user.uid,
        displayName: name,
        email: email,
      }

      await setDoc(doc(fireDb, "users", user.uid), userObj);

      localStorage.setItem('blogpost-user', JSON.stringify(userObj));

      setUser(userObj);

      toast.success('Account Created Successfully');
      toast.success('Logged in Successfully');
      navigate('/home');

    } catch (error) {
      toast.error('Signup attempt unsuccessfull');
    }
    finally {
      setLoading(false);
    }
  }

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userObj = {
        id: user.uid,
        displayName: user.displayName,
        email: email,
      }
      localStorage.setItem('blogpost-user', JSON.stringify(userObj));

      setUser(user);

      toast.success('Logged in Successfully');

      navigate('/home');
    } catch (error) {
      toast.error('Login attempt unsuccessfull');
    }
    finally {
      setLoading(false);
    }

  }

  const logOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('blogpost-user');
    }).catch((error) => {

    });
  }

  const updateName = async (name) => {
    await updateProfile(auth.currentUser, {
      displayName: name
    })
  }

  const getUser = async (id) => {
    const q = doc(fireDb, 'users', id);
    const document = await getDoc(q);
    return document;
  }

  const addBlog = (image, blog, title, type) => {
    setLoading(true);

    const storage = getStorage();
    const storageRef = ref(storage, `/blogs/${image.name}`);

    uploadBytes(storageRef, image)
      .then((snapshot) => {
        getDownloadURL(ref(storage, `/blogs/${image.name}`))
          .then((url) => {
            addDoc(collection(fireDb, 'blogs'), {
              image: url,
              blog,
              title,
              type,
              likes: [],
              comments: [],
              creator: JSON.parse(localStorage.getItem('blogpost-user')),
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString()
            }).then(() => {
              toast.success('Blog uploaded successfully!');
              navigate('/home');
            })
              .catch((error) => {
                toast.error('Blog upload is unsuccessful');
              })
              .finally(() => {
                setLoading(false);
              })
          }).catch(err => console.log(err));
      }).catch(err => console.log(err))
  }

  const getBlogs = async () => {
    const blogs = [];
    const docs = await getDocs(collection(fireDb, 'blogs'));

    docs.forEach((doc) => {
      const id = doc.id;
      blogs.push({ id, ...doc.data() });
    })
    return blogs;
  }

  const getBlog = async (id) => {
    const q = doc(fireDb, 'blogs', id);
    const document = await getDoc(q);
    return document;
  }

  const updateBlog = async (id, updated) => {
    let updatedDoc

    try {
      const q = doc(fireDb, 'blogs', id);
      updatedDoc = await setDoc(q, updated);
    } catch (error) {
      toast.error(`Something went wrong`);
    }

    return updatedDoc;
  }

  const deleteBlog = async (id) => {
    await deleteDoc(doc(fireDb, "blogs", id));
  }


  return { user, loading, signUp, signIn, logOut, getUser, addBlog, getBlogs, getBlog, updateBlog, deleteBlog }
};

export default useFirebase;