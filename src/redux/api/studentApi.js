import { toast } from "react-toastify";
import { request } from "../../utils/request";
import { studentActions } from "../slices/studentSlice";

export const getstudentsByPaymentsSchool = (school,cb) => async (dispatch) => {
  dispatch(studentActions.setError(null));
  dispatch(studentActions.setGetLoading(true));
  dispatch(studentActions.setStudents(null));
  try {
    // await new Promise((resolve)=>setTimeout(resolve,5000))
    const response = await request.get(`/students/payments/${school}`);
    console.log(response)
    dispatch(studentActions.setStudents(response.data));
  } catch (error) {
    console.log(error);
 
    // dispatch(studentActions.setStudents(null));
    // if (error?.response) {
    //   error.response.status === 500 &&
    //     dispatch(studentActions.setError(error.response.data.message));

    //   console.log("responce exist");
    // } else {
    //   dispatch(
    //     studentActions.setError(
    //       "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
    //     )
    //   );
    // }
    // cb && cb();
  } finally {
    dispatch(studentActions.setGetLoading(false));
  }
};

export const createstudent = (student, cb) => async (dispatch) => {
  dispatch(studentActions.setError(null));
  dispatch(studentActions.setCreateLoading(true));

  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await request.post("/students", student);
    dispatch(studentActions.addstudent(response.data.student));
    toast.success(response.data.message);
    cb && cb();
  } catch (error) {
    console.log(error);
    if (error?.response) {
      error.response.status === 500 &&
        toast.error(error.response.data.message, {
          autoClose: false,
          closeButton: true,
        });

      error.response.status === 400 &&
        toast.error("Ereure devalidation", {
          autoClose: 2000,
          closeButton: true,
        });
      dispatch(studentActions.setErrorValidation(error.response.data));
    } else {
      toast.error(
        "Le serveur est en panne, vérifiez si votre serveur est démarré ?",
        {
          autoClose: 5000,
          closeButton: true,
        }
      );
    }
    // dispatch(studentActions.setError(null))F;
  } finally {
    dispatch(studentActions.setCreateLoading(false));
  }
};

export const getstudentById = (id, cb) => async (dispatch) => {
  dispatch(studentActions.setError(null));
  dispatch(studentActions.setGetLoadingById(true));
  dispatch(studentActions.setstudent(null));

  try {
    await new Promise((resolve)=>setTimeout(resolve,5000))

    const response = await request.get(`/students/${id}`);
    dispatch(studentActions.setstudent(response.data));
  } catch (error) {
    console.log(error);
    if (error?.response) {
      if (error.response.status === 500 || error.response.status === 404) {
        dispatch(studentActions.setError(error.response.data.message));
      } else {
        dispatch(
          studentActions.setError("Erreur lors de la récupération du student")
        );
      }
    } else {
      dispatch(
        studentActions.setError(
          "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
        )
      );
    }
    dispatch(studentActions.setstudent(null));
    cb && cb();
  }
  finally {
    dispatch(studentActions.setGetLoadingById(false));
  }
};

export const updatestudent = (id, updatedstudent, cb) => async (dispatch) => {
  dispatch(studentActions.setError(null));
  dispatch(studentActions.setCreateLoading(true));
  dispatch(studentActions.setstudent(null));

  try {
    await new Promise((resolve)=>setTimeout(resolve,5000))
    const response = await request.put(`/students/${id}`, updatedstudent);
    if (response.status === 200){
      dispatch(studentActions.updatestudents({ id, student: response.data.student }));
      toast.success(response.data.message);
      cb && cb();
    } 
  
  } catch (error) {
    console.log(error);
    if (error?.response) {
      if (error.response.status === 500) {
        toast.error(error.response.data.message, {
          autoClose: false,
          closeButton: true,
        });
      } else if (error.response.status === 400) {
        toast.error("Validation error", {
          autoClose: 2000,
          closeButton: true,
        });
        dispatch(studentActions.setErrorValidation(error.response.data));
      } else {
        toast.error("Error updating student", {
          autoClose: 5000,
          closeButton: true,
        });
      }
      // dispatch(studentActions.setError(error.response.data.message));
    } else {
      toast.error("Server is down, please check if your server is running", {
        autoClose: 5000,
        closeButton: true,
      });
    }
  } finally {
    dispatch(studentActions.setCreateLoading(false));
  }
};

export const deletestudent = (id, cb) => async (dispatch) => {
  try {
    const response = await request.delete(`students/${id}`);
    if (response.status === 200){
      dispatch(studentActions.removestudent(id))
      toast.success(response.data.message);
    } 
  } catch (error) {
    console.log(error)
    if (error?.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(
        "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
      );
    }
  }
};
