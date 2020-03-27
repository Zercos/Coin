<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form>
        <div class="input-field">
          <select>
            <option>Category</option>
          </select>
          <label>Select category</label>
        </div>

        <div class="input-field">
          <input type="text" id="name" />
          <label for="name">Name</label>
          <span class="helper-text invalid">TITLE</span>
        </div>

        <div class="input-field">
          <input id="limit" type="number" />
          <label for="limit">Limit</label>
          <span class="helper-text invalid">LIMIT</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Refresh
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'category-edit'
}
</script>
