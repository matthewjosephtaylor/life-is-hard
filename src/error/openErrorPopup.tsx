export const openErrorPopup = async (error: unknown) => {
  console.warn("deprecated use 'error' event", error);
  // console.error(error);
  // return openAppPopup(<ErrorPopup error={error} />);
  // return openAppPopup(<UnobtrusiveErrorToast error={error} />);
};
