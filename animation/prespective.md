## how to create prespective animation

1. add prespective prop to parent
2. animate rotation of child

```css
.origin-container {
  perspective: 250px;
}

.child {
  width: 100px;
  height: 100px;
  background-color: green;
  animation: rotateY 2s infinite ease-in-out alternate;
}

@keyframes rotateY {
  from {
    transform: rotateY(45deg);
  }
  to {
    transform: rotateY(0deg);
  }
}
```

we can also pick the point at which the element rotates using `transform-origin: right;` for example.
