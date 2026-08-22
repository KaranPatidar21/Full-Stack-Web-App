export function addCaseHandler(builder, asyncThunk, stateName) {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      if (stateName) {
        state[stateName] = action.payload;
      }
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "The request could not be completed.";
    });
}
