# angular-select


## basic usage
```html

<div ng-select="myModel" onchange="...">

    <div class="showValue" ng-select-switch ng-bind="ngSelect.selected.alt">
        <!-- 這裡會是 option 的 alt -->
    </div>

    <ul ng-select-fold>
        <li ng-select-option="" value="1" alt="title1">optionView1</li>
        <li ng-select-option="" value="2" alt="title2">optionView2</li>
        <li ng-select-option="" value="3" alt="title3">optionView3</li>
        <li ng-select-option="" value="4" alt="title4">optionView4</li>
        <li ng-select-option="" value="5" alt="title5">optionView5</li>
    </ul>

</div>

```