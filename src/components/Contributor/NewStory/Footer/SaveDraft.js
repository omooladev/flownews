import { useCallback, useContext } from "react";
import styles from "./SaveDraft.module.css";
import { AuthContext } from "../../../../store/Auth/auth-context";
import InfoModal from "../../../../UI/InfoModal";
const SaveDraft = ({ isLoading, onSaveIsLoading }) => {
  const { onSaveStoryToDatabase, newStory, infoModal, onChangeInfoModal } = useContext(AuthContext);
  const saveDraftHandler = useCallback(async () => {
    if (!newStory.title && !newStory.coverImage & !newStory.value) {
      return;
    }
    onSaveIsLoading("save-draft");
    //const { data, error } = await onSaveStoryToDatabase({ status: "draft" });
    let error = "olawole";
    if (error) {
      onChangeInfoModal(true, "Draft not saved. Please try again");
    }
    onSaveIsLoading(null);
  }, [newStory, onSaveIsLoading, onSaveStoryToDatabase, onChangeInfoModal]);
  return (
    <>
      <button
        type="button"
        className={styles["save-draft-button"]}
        onClick={saveDraftHandler}
        disabled={isLoading.source === "save-draft"}
      >
        {isLoading.source === "save-draft" ? "Saving Draft..." : "Save draft"}
      </button>

      <InfoModal />
    </>
  );
};

export default SaveDraft;

//TODO---------> THE REASON WHY I WANT A DRAFT PREVIEW IMMEDIATELY YOU CLICK SAVE TO DRAFT IS BECAUSE I WANT YOU TO
//BE ABLE TO SHARE THE LINK WITH PEOPLE SO THAT THEY CAN BE ABLE TO SHARE THEIR DRAFT LINK WITH ANOTHER PERSON
// ESPECIALLY IF THEY WANTED THE PERSON TO WORK ON THE SAME POST WITH THEM. I WOULD ALLOW THEM TO BE ABLE TO
// APPROVE USERS THAT CAN SEE THE DRAFT.

// LATER WE WOULD WORK ON ALLOWING CONTRIBUTOR TO COLLABORATE WITH ANOTHER ON A PIECE AND ALSO GIVE COMMENTS ABOUT THE PIECE
