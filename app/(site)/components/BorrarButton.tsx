"use client";

import * as React from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { MdDeleteOutline } from "react-icons/md";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface BorrarButtonProps {
  songId: string;
}

const BorrarButton: React.FC<BorrarButtonProps> = ({ songId }) => {
  const { supabaseClient } = useSessionContext();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const aceptarBorrar = () => {
    BorrarEfecto();
    setOpen(false);
  };

  const Icon = MdDeleteOutline;

  const getEfectoID = async () => {
    const { data } = await supabaseClient
      .from("efectos")
      .select("id")
      .eq("id", songId)
      .single();
    console.log(data?.id);
    return data?.id;
  };

  const getEfectoNombre = async () => {
    const { data } = await supabaseClient
      .from("efectos")
      .select("titulo")
      .eq("id", songId)
      .single();
    return data?.titulo;
  };

  const BorrarEfecto = async () => {
    const idSFX = await getEfectoID();

    const { data, error } = await supabaseClient
      .from("efectos")
      .delete()
      .eq("id", idSFX);
    if (error) {
      toast.error("Error deleting sound effect");
      throw error;
    }
    toast.success("Sound effect deleted");

    console.log(data);
  };

  return (
    <>
      <button
        className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
        onClick={handleClickOpen}
      >
        <Icon color={"white"} size={25} />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete this sound effect?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CLOSE</Button>
          <Button onClick={aceptarBorrar} autoFocus>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BorrarButton;
