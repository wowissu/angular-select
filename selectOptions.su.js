(function () {
    "use strict";

    app.directive('ngSelect', ['$compile', '$parse', '$rootScope', function ($compile, $parse, $rootScope) {

        var ngSelect = function ngSelect ($scope, $element, $attrs, $transclude) {

            var self = this;
            var jqueryElement = $($element[0]);

            self.$scope  = $scope;
            self.folding = true;
            self.ngModel = $parse($attrs.ngSelect);
            self.options = {};
            self.assign  = function (val) {
                self.ngModel.assign($scope, val);
                return self;
            };

            var unregister = $scope.$watch(function () {
                return self.ngModel($scope);
            }, function (val, oldVal) {
                self.selected = self.options[val];
                self.onchange(val, self.selected);
            });

            $compile($('<input>').attr({
                'type': 'hidden',
                'ng-model': $attrs.ngSelect,
                'name': $attrs.name,
                'ng-required': $attrs.ngRequired,
                'required': $attrs.hasOwnProperty('required'),
                'ng-model-init': $attrs.ngModelInit,
            }).appendTo($element))($scope);

            $transclude($scope, function (html) {
                $element.append(html);
            });

            $(document).on('click', function (event) {
                if (
                    jqueryElement.is(event.target) ||
                    jqueryElement.has(event.target).length ||
                    self.folding
                ) {
                    return;
                }
                self.fold();
                $rootScope.$applyAsync();
            });

            /** on change */
            if ($attrs.hasOwnProperty('onchange')) {
                self.onchange = function (value, selected) {
                    return $parse($attrs.onchange)($scope, {value: value, 'selected': selected});
                };
            } else {
                self.onchange = function () {
                    return;
                };
            }
        };

        ngSelect.prototype.unfold = function () {
            this.folding = false;
            return this;
        };

        ngSelect.prototype.fold = function () {
            this.folding = true;
            return this;
        };

        ngSelect.prototype.tgFold = function () {
            this.folding = !this.folding;
            return this;
        };

        ngSelect.prototype.addOption = function ($attrs) {
            var self = this;
            self.options[$attrs.ngSelectOption] = $attrs;

            $attrs.$$element.on('click', function (event) {

                var val = $parse($attrs.ngSelectOption)(self.$scope);
                self.fold();
                self.assign(val);

                if ('onselected' in $attrs) {
                    $parse($attrs.onselected)(self.$scope, {value: val});
                }

                $rootScope.$applyAsync();
                event.preventDefault();
                event.stopPropagation();
            });
        };

        return {
            restrict: 'A',
            scope: true,
            transclude: true,
            controllerAs: 'ngSelect',
            controller: ngSelect,
        };
    }]);
        app.directive('ngSelectFold', [function () {
            return {
                require: '^^ngSelect',
                restrict: 'A',
                link: function ($scope, $element, $attrs, ngSelect) {
                    $scope.$watch('ngSelect.folding', function (val) {
                        if (val) {
                            $element.addClass('ng-hide');
                        } else {
                            $element.removeClass('ng-hide');
                        }
                    });
                }
            };
        }]);
        app.directive('ngSelectSwitch', [function () {
            return {
                require: '^^ngSelect',
                restrict: 'A',
                link: function ($scope, $element, $attrs, ngSelect) {
                    $element.on('click', function () {
                        ngSelect.tgFold();
                        $scope.$apply();
                    });
                }
            };
        }]);
        app.directive('ngSelectOption', [function () {
            return {
                require: '^^ngSelect',
                restrict: 'A',
                link: function ($scope, $element, $attrs, ngSelect) {
                    ngSelect.addOption($attrs);
                }
            };
        }]);

}());

