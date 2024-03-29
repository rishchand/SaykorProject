﻿using System.Web;
using System.Web.Optimization;

namespace HospitalManagement
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));


            bundles.Add(new ScriptBundle("~/bundles/jqwidget").Include(
                        "~/Scripts/jqwidgets/jqxcore.js",
                        "~/Scripts/jqwidgets/jqxmenu.js",
                        "~/Scripts/jqwidgets/jqxtabs.js",
                        "~/Scripts/jqwidgets/jqxdata.js",
                        "~/Scripts/jqwidgets/jqxsplitter.js",
                        "~/Scripts/jqwidgets/jqxpanel.js",
                        "~/Scripts/jqwidgets/jqxbuttons.js",
                        "~/Scripts/jqwidgets/jqxbuttongroup.js",
                        "~/Scripts/jqwidgets/jqxradiobutton.js",
                        "~/Scripts/jqwidgets/jqxdatetimeinput.js",
                        "~/Scripts/jqwidgets/jqxcalendar.js",
                        "~/Scripts/jqwidgets/jqxscrollbar.js",
                        "~/Scripts/jqwidgets/jqxmenu.js",
                        "~/Scripts/jqwidgets/jqxinput.js",
                        "~/Scripts/jqwidgets/jqxcheckbox.js",
                        "~/Scripts/jqwidgets/jqxlistbox.js",
                        "~/Scripts/jqwidgets/jqxdropdownlist.js",
                        "~/Scripts/jqwidgets/jqxgrid.js",
                        "~/Scripts/jqwidgets/jqxgrid.pager.js",
                        "~/Scripts/jqwidgets/jqxgrid.sort.js",
                        "~/Scripts/jqwidgets/jqxgrid.filter.js",
                        "~/Scripts/jqwidgets/jqxgrid.selection.js",
                        "~/Scripts/jqwidgets/jqxprogressbar.js",
                        "~/Scripts/jqwidgets/jqxexpander.js",
                        "~/Scripts/jqwidgets/jqxscrollbar.js",
                        "~/Scripts/jqwidgets/jqxtree.js",
                        "~/Scripts/jqwidgets/jqxwindow.js",
                        "~/Scripts/gettheme.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/epicapi").Include(
                        "~/Scripts/epicapi.js"
                        ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Scripts/jqwidgets/styles1").Include(
                "~/Scripts/jqwidgets/styles/jqx.base.css",
                "~/Scripts/jqwidgets/styles/qtxTheme.css"));



            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));


            BundleTable.EnableOptimizations = true;
        }

    }
}