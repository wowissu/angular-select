# angular-select


## basic usage
```html

<div ng-select="myModel" onchange="...">

    <div class="showValue" ng-select-switch ng-bind="ngSelect.selected.alt">
        <!-- 這裡會是 option 的 alt -->
    </div>

    <ul ng-select-fold>
        <li ng-select-option="1" alt="title1" onselected="..." >optionView1</li>
        <li ng-select-option="2" alt="title2" onselected="..." >optionView2</li>
        <li ng-select-option="3" alt="title3" onselected="..." >optionView3</li>
        <li ng-select-option="4" alt="title4" onselected="..." >optionView4</li>
        <li ng-select-option="5" alt="title5" onselected="..." >optionView5</li>
    </ul>

</div>

```