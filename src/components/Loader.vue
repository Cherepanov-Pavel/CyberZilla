<template>
  <div class="wrapper">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<style lang="sass">

.wrapper
    position: absolute
    margin-left: auto
    margin-right: auto
    left: 0
    right: 0
    width: max-content

.lds-dual-ring
  display: inline-block
  width: 80px
  height: 80px

.lds-dual-ring:after
  content: " "
  display: block
  width: 64px
  height: 64px
  margin: 8px
  border-radius: 50%
  border: 6px solid black
  border-color: black transparent black transparent
  animation: lds-dual-ring 1.2s linear infinite

@keyframes lds-dual-ring
  0%
    transform: rotate(0deg)

  100%
    transform: rotate(360deg)
</style>
